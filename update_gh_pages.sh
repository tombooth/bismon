#!/bin/bash

set -euo pipefail

words/render.sh

mkdir .working

cp words/index.html .working
cp -r words/img .working

git checkout gh-pages
git rm -rf .

cp -r .working/* .

git add index.html
git add -A img/

git commit -m "Updating homepage"
git push origin gh-pages -f
git checkout master

rm -rf .working
