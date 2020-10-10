## Makefile Runner
Allows us to run/copy make targets directly from vscode terminal.
### Installation
TODO
### Setup
To export environment variables while running targets.
Open `settings.json` and add configs
``` json
"make-runner.env": {
  "development": {
    "AWS_PROFILE": "development",
    "RAILS_ENV": "development",
    "ROLE": "admin",
    "ENABLE_MFA": true
  },
  "staging": {
    "AWS_PROFILE": "development",
    "RAILS_ENV": "development",
    "ROLE": "user",
    "ENABLE_MFA": true
  },
  "none": {}
}
```
### Usage
Open any Makefile
Put the cursor on any target
- Use key bindings `cmd+shift+enter` for Mac or `ctrl+shift+enter` for Windows to run the target
- Use key bindings `cmd+shift+c` for Mac or `ctrl+shift+c` for Windows to copy the target command
![](sample.gif)
