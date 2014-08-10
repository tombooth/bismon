#!/bin/bash

curl https://raw.githubusercontent.com/tombooth/tombooth.github.io/develop/templates/post.html > post.html.template

pandoc --template=post.html.template -s words/article.md -o words/index.html

rm post.html.template
