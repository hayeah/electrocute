# Electron Prebuilt

The newest version of Electron (v0.37 or above) doesn't work (I don't know why).

My version is 0.36.5, try install this version instead.

```
npm install electron-prebuilt@0.36.5
```

# Debugging

Debug NodeJS with Electron.

```
npm install electrocute
```

```
electrocute script.js arg1 arg2 arg2
```

`electrocute` should automatically restart the script if it changes.

Once inside the debugger:

+ `cmd-r` to reload the script.
+ `cmd-p` to search for a file.



