import { format } from 'path';
import { write } from 'fs';

const fs = require('fs');

class ConsoleWriter {
    indentation: number = 0;

    write(text: string) {
        console.log('  '.repeat(this.indentation) + text);
    }

    indent() {
        this.indentation++;
    }

    unindent() {
        this.indentation--;
    }
}

class MarkdownFileWriter extends ConsoleWriter {
    filepath = '';
    buffer = '';

    createFile(filepath: string) {
        this.filepath = filepath;
        fs.open(filepath, 'w', function(err: any, file: any) {
            if (err) {
                console.log('Failed to create file: ' + filepath);
                throw err;
            }
        });

        console.log('Created file ' + filepath);
    }

    write(text: string) {
        this.buffer += text;
    }

    closeFile() {
        fs.appendFile(this.filepath, this.buffer, (err: any) => {
            if (err) throw err;
        });

        this.filepath = '';
        this.buffer = '';
    }
}

/**
 * Token parsing
 *
 * To parse the original header file, we fixed nesting structure of "tokens"
 * These classes provide ugly regular expressions that covert a "c"-textblock
 * into token instances that a broken down into smaller in smaller pieces.
 *
 * The currently assumed nesting structure is....
 *
 * FileToken - Single node that holds the header file
 *   Sections - Regions within the header file seperated with ---- lines.
 *              -> These are saved into separate .md files
 *      Comment - a comment block outside of a {} scope -> H1
 *      Scope - a scope with curly braces (enums, structs, namespaces) -> H2
 *        ScopeComment - a comment within a scope -> H3
 *        ScopeMethodLine - a IMGUI namespace definition.
 */
class Token {
    title = '';
    children: Token[] = [];

    getShortTitle(): string {
        return this.title
            .split('\n')[0]
            .split(' ')
            .slice(0, 4)
            .join(' ');
    }

    getTokenDescription(): string {
        const lineCount = this.title.split('\n').length;
        const lines = lineCount > 1 ? ` (${lineCount} lines)` : '';
        return `<${this.constructor.name}> ` + this.getShortTitle() + lines;
    }

    printStructure(w: ConsoleWriter) {
        writer.write(this.getTokenDescription());
        writer.indent();
        this.children.forEach(t => t.printStructure(writer));
        writer.unindent();
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        // Todo: implement for all TokenTypes
        writer.write(this.title);
    }
}

/** Items like methods, enums etc. normally follow by trailing comment */
class ScopeMethodLine extends Token {
    returnValue: string = '';
    methodName: string = '';
    params: string = '';
    comment: string = '';

    constructor(
        returnValue: string,
        methodName: string,
        params: string,
        comment: string
    ) {
        super();
        this.title = methodName + ' //' + comment;
        this.returnValue = returnValue;
        this.methodName = methodName;
        this.params = params;
        this.comment = comment;
    }

    static parse(text: string): Token[] {
        const regex = /(.*?)\s+IMGUI_API\s+(\S+?)\s*(\S+?)(\((.*?)\));\s*(\/\/\s(.+?))?\n(.*)/ms;
        let tokens: Token[] = [];
        let remaining: string = '\n' + text + '\n';

        for (
            let result: RegExpExecArray | null;
            (result = regex.exec(remaining));

        ) {
            let [
                ,
                previous,
                returnValue,
                methodName,
                params,
                ,
                ,
                comment,
                newRemaining,
            ] = result;

            tokens.push(
                new ScopeMethodLine(returnValue, methodName, params, comment)
            );

            remaining = '\n' + newRemaining;
        }
        //tokens.push(...ScopeContent.parse('\n' + remaining));
        return tokens;
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        /** Some unsuccessful MarkDown layout experiments */

        // writer.write(
        //     '###`' +
        //         `${this.returnValue} ` +
        //         '` **`' +
        //         ` ${this.methodName}` +
        //         '`**`' +
        //         `${this.params} ` +
        //         '`' +
        //         '\n'
        // );

        // writer.write(
        //     `- ${this.returnValue} **${this.methodName}**${this.params}`
        // );

        //writer.write('\n');
        // writer.write(
        //     `- ${this.returnValue} **${this.methodName}**${this.params}<br/>\n`
        // );

        // writer.write(
        //     `\n#### ${this.returnValue} **${this.methodName}**${this.params}\n`
        // );

        writer.write(
            '\n``` c\n' +
                `${this.returnValue} ${this.methodName}${this.params}\n` +
                '```\n'
        );

        if (this.comment) writer.write(this.comment + '\n');
    }
}

/** Parse content in scopes between ScopeComments */
class ScopeContent extends Token {
    static parse(text: string): Token[] {
        let parts: Token[] = [];

        parts.push(...ScopeMethodLine.parse(text));
        return parts;
    }
}

class ScopeComment extends Token {
    constructor(text: string) {
        super();
        this.title = text.replace(/    \/\/\s/g, '');
        // TODO: more parsing here...
    }

    static parse(text: string): Token[] {
        const regex = /(.*?\n)((    \/\/ ([^\n]*\n)){1,})(.*)/ms;
        let blocks: Token[] = [];
        let remaining: string = '\n' + text;

        for (
            let results: RegExpExecArray | null;
            (results = regex.exec(remaining));

        ) {
            let [, previous, comment, , , newRemaining] = results;
            blocks.push(...ScopeContent.parse('\n' + previous));
            blocks.push(new ScopeComment(comment));

            remaining = newRemaining;
        }
        blocks.push(...ScopeContent.parse('\n' + remaining));
        return blocks;
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        writer.write(`### ${this.title}\n\n`);

        //writer.write(this.text);

        this.children.forEach(c => c.writeMarkdown(writer));
    }
}

/** Scopes like struct, classes, enums etc. */
class Scope extends Token {
    type: string;

    constructor(type: string, title: string, content: string) {
        super();
        this.title = `<${type}> ${title}`;
        this.type = type;
        this.children.push(...ScopeComment.parse(content));
        // TODO: further parse content
    }

    static parse(text: string): Token[] {
        const regex = /(.*?)\n(struct|namespace|enum)\s+(\w+)\s*{\n(.+?)\n}(.*)/ms;
        let newTokens: Token[] = [];
        let remaining: string = text;

        for (
            let result: RegExpExecArray | null;
            (result = regex.exec(remaining));

        ) {
            let [, previous, type, title, contents, newRemaining] = result;
            //if (previous !== '') newTokens.push(...ScopeComment.parse(previous));

            if (title !== '') newTokens.push(new Scope(type, title, contents));

            remaining = newRemaining;
        }
        //blocks.push(new CommentBlock(previousTitle, remaining));
        return newTokens;
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        writer.write(`## ${this.type}  **${this.title}**\n`);

        //writer.write(this.text);

        this.children.forEach(c => c.writeMarkdown(writer));
    }
}

/** An unspecified code block between CommentBlocks */
class SectionContent extends Token {
    static parse(text: string): Token[] {
        let parts: Token[] = [];

        parts.push(...Scope.parse(text));
        return parts;
    }
}

class Comment extends Token {
    text: string = '';

    constructor(text: string) {
        super();

        const lines = text.replace(/\/\/\s+/g, '').split('\n');

        this.title = lines[0];
        this.text =  lines.length<1 ? '' : lines.slice(1).join('\n'); 
        // TODO: more parsing here...
    }

    static parse(text: string): Token[] {
        const regex = /(.*?\n)((\/\/ ([^\n]*\n)){1,})(.*)/ms;
        let blocks: Token[] = [];
        let remaining: string = text;

        for (
            let results: RegExpExecArray | null;
            (results = regex.exec(remaining));

        ) {
            let [, previous, blockText, , , newRemaining] = results;
            blocks.push(...SectionContent.parse('\n' + previous));
            blocks.push(new Comment(blockText));

            remaining = newRemaining;
        }
        blocks.push(...SectionContent.parse('\n' + remaining));
        return blocks;
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        if(!this.title.startsWith('!'))
            writer.write('## ' + this.title + '\n');

        writer.write(this.text);

        this.children.forEach(c => c.writeMarkdown(writer));
    }
}

/** Sections introduced with line headings.
 * This will be split into multipe files
 */
class Section extends Token {
    constructor(title: string, rawText: string) {
        super();
        this.title = title.trim();
        this.children.push(...Comment.parse(rawText));
    }

    static parse(text: string): Token[] {
        const regex = /(.*?)\/\/----.*?\n\/\/(.*?)\n\/\/----.*?\n(.*)/ms;
        let previousTitle = 'Introduction';
        let sections: Section[] = [];
        let remaining: string = text;

        for (
            let results: RegExpExecArray | null;
            (results = regex.exec(remaining));

        ) {
            let [, text, nextTitle, newRemaining] = results;

            if (text !== '') {
                sections.push(new Section(previousTitle, text));
            }
            previousTitle = nextTitle;
            remaining = newRemaining;
        }
        sections.push(new Section(previousTitle, remaining));
        return sections;
    }

    writeMarkdown(writer: MarkdownFileWriter) {
        writer.write('# ' + this.title + '\n');

        this.children.forEach(c => c.writeMarkdown(writer));
    }
}

class FileToken extends Token {
    title = 'file';

    static parse(text: string): FileToken[] {
        var token = new FileToken();
        token.children.push(...Section.parse(text));
        return [token];
    }

    writeFiles(writer: MarkdownFileWriter) {
        this.children.forEach(t => {
            if (t instanceof Section) {
                const filepath =
                    'docs/api-imgui/' +
                    t.getShortTitle().replace(/[\W]/g, '-') +
                    '.md';
                writer.createFile(filepath);
                var section = t as Section;
                section.writeMarkdown(writer);
                writer.closeFile();
            }
        });
    }
}

let text: string = fs.readFileSync('imgui.h').toString();

const fileToken = FileToken.parse(text)[0];

const writer = new ConsoleWriter();
fileToken.printStructure(writer);

const markdownWriter = new MarkdownFileWriter();
fileToken.writeFiles(markdownWriter);
