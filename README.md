<h1 align="center">IncLetter</h1>

<h5 align="center"> Small plugin to get the next letter in the roman alphabet</h5>

![incLetter](/media/incLetter.gif?raw=true 'incLetter')


### INSTALL
Install with [vim-plug](https://github.com/junegunn/vim-plug), assumes node and
yarn|npm installed globally.

With vim-plug
```vim
" post install (yarn install | npm install)
Plug 'ricardogcolombo/incLetter.nvim', { 'do': 'npm --prefix ./rplugin/node/incletter.vim/ install' }
```

### USAGE
Set the cursor on the letter to change and write:

Get Next Character

```vim
:IncChar
```

Get Prev. Character
```vim
:DecChar
```
