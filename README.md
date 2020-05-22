# About

An attempt to convert the [main API header file](https://github.com/ocornut/imgui/blob/master/imgui.h) of the [dear ImGui](https://github.com/ocornut/imgui/) library into a group of markdown files.

These files are then processed and presented by [mkdocs-material](https://squidfunk.github.io/mkdocs-material/).

![image](images/image.gif)

## Installation

### node / typescript

1. Clone

    ```
    clone github.com/pixtur/mkdocs-for-imgui
    cd mkdocs-for-imgui
    ```

2. Install packages

    ```
    npm install
    ```

3. Convert
    ```
    npm run convert
    ```

### mkdocs material

1. Download and install docker: https://download.docker.com/mac/stable/Docker.dmg
2. Install mkdocs-material

    ```
    docker pull squidfunk/mkdocs-material
    ```

3. Start a local Lokaler Server

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
    ```

4. Build (needs to be fixed)

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material build
    ```


## Demo

Documentation extracted from [imgui v1.77](https://pixtur.github.io/mkdocs-for-imgui/site/api-imgui/ImGui--Dear-ImGui-end-user)

## Remarks / Warning

The is a work in progress. Although the complicated step of parsing the header file seems to work more or less stable, the following steps need additional work:

-   The current version was only tested on the IMGUI namespace
-   all enum definitions are missing
-   many other definitions needs clean up
-   the navigation structure on the left needs more work
-   the API-markdown file should probably be broken down into smaller files
-   the quality of the built in search seems to be lacking
-   some aspects of the original header file would need be adjusted
