# About

A small script that converts the [main API header file](https://github.com/ocornut/imgui/blob/master/imgui.h) of the [dear ImGui](https://github.com/ocornut/imgui/) library into a group of markdown files.

These files are then processed and presented by [mkdocs-material](https://squidfunk.github.io/mkdocs-material/).

## Installation

1. Download and install docker: https://download.docker.com/mac/stable/Docker.dmg
2. Install mkdocs-material

    ```
    docker pull squidfunk/mkdocs-material
    ```

3. Start a local Lokaler Server

    ```
    clone github.com/pixtur/mkdocs-for-imgui
    cd mkdocs-for-imgui
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
    ```

4. Build (needs to be fixed)

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material build
    ```

## Remarks

The is a work in progress. Although the complicated step of parsing the header file seems to work more or less stable, the following steps need additional work:

-   enum definitions are missing
-   the navigation structure on the left needs more work
-   the API should probably be broken down into smaller steps
-   the quality of the built in search seems to be bad
