<h1 align="center">IncChar</h1>

<h5 align="center"> Small plugin to get the next character in the roman alphabet</h5>

![DecChar](/media/decchar.gif?raw=true 'DecChar')


### INSTALL
Install with [vim-plug](https://github.com/junegunn/vim-plug), assumes node and
yarn|npm installed globally.

With vim-plug
```vim
" post install (yarn install | npm install)
Plug 'ricardogcolombo/incChar.nvim', { 'do': 'npm --prefix ./rplugin/node/incchar.nvim/ install' }
```

After run PlugInstall use `:UpdateRemotePlugins` and restart neovim

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
