# BGPartner

BGPartner (Baldur's Gate Partner) is a Linux/Windows (64 and 32 bits respectively) companion tool for the 2.6.6 versions of Baldur's Gate and Baldur's Gate II: Shadows of Amn. It produces overlays on user-selected creatures detailing their stats and effects.

## Acknowledgments

Though implemented from scratch, this project draws heavily from [BG2RadarOverlay](https://github.com/tapahob/BG2RadarOverlay) and [EEEx's documentation](https://eeex-docs.readthedocs.io).

## Quickstart

Go to [releases](https://github.com/gatperdut/bg-partner/releases) and download the version for your, then unzip the files somewhere, and follow the instructions below according to your OS.

Whether you run first BGPartner and then the game, or viceversa, is irrelevant.

### Windows

Just run the executable - double-click on it, or run it from a shell for some more output with `BGPartner.exe`.

### Linux

Linux is a bit more involved.

First off, ASLR (address space layout randomization) needs to be disabled and process tracing needs to be allowed. The following commands will take care of changing the system settings, but these will not survive a system restart.

- ASLR: `echo 0 | sudo tee /proc/sys/kernel/randomize_va_space`
- ptrace: `echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope`

There are ways the changes permanent, but that is not recommended. Re-run the commands next time you boot up the computer and want to use BGPartner.

When you are done with BGPartner, exchange the `0` with a `1` in the commands and run them again (or simply restart).

Additionally, make sure the following tools are available:

- `xdotool`
- `wmctrl`

You can use `apt`, `pacman`, etc. For example, `sudo apt install xdotool`.

Once you are ready, go in your terminal to BGPartner's directory and `sudo ./BGPartner`.

### Configuration

On its first execution BGPartner will create a file called `bg-partner.json` where it stores its configuration, which you can edit. These are the default values:

```
  {
    "exe": "BaldursGateII" (Linux) / "Baldur.exe" (Windows),
    "display": null,
    "ms": 300,
    "accelBorderless": "CommandOrControl+Q",
    "accelSheet": "CommandOrControl+A",
  };

```

- `exe`: the name of the executable. On Windows this is always `Baldur.exe`, and will likely require no change. On Linux it is either `BaldursGate` or `BaldursGateII`, so edit accordingly.

- `display`: `null` to use your primary display, or a number between 0 and 1 less than your number of displays (`0` or `1` if you have two displays, for example). May require a bit of trial and error, though `0` most likely corresponds to your primary display. Run the game in whatever display you select here.

- `ms`: refresh rate in milliseconds.

- `accelBorderless`: shortcut to make the game's window fullscreen borderless.

- `accelSheet`: shortcut to open the overlay when the mouse is over the selection circle of a creature.

Note that both `accelBorderless` and `accelSheet` need to follow the pattern indicated by [Electron's accelerators](https://www.electronjs.org/docs/latest/api/accelerator). Keep in mind that:

- Accelerators will only work while the game is focused.

- They *will* block that same combination of keys everywhere else in your system while BGPartner is running.

### How to use

The games must *not* be run in "Full screen" mode (deactivate that option in the "Graphics" options).

Once BGPartner launches successfully, you will see this window:

![Control window](src/assets/readme/control.png)

The upper line will display "❌ Process not found" if no running instance of a game could be found.

As the bottom line indicates, BGPartner will shut down as soon as this window is closed.

Now go to your game and use your `accelBorderless` shortcut to make the game window borderless. It will also take the full display.

Next, move the mouse over some creature and use your `accelSheet` shortcut. You will see something like this:

TODO

## Bugs and reports

BGPartner is very much in development, specially when it comes to testing under different environments. So far, only the Steam version of the games under Ubuntu / Windows 11 are officially supported.

If you encounter problems or would like to share your suggestions please note them down [here](https://github.com/gatperdut/bg-partner/issues).

## Development

Same requirements apply as for running BGPartner in your OS of choice.

Additionally:

- Check `.nvmrc` for the Node.js version. On Linux, `nvm use`.
- `npm i` to install dependencies.
- `npm run start` to launch.

[Visual Studio Code](https://code.visualstudio.com/) is a good IDE to consider.

You may need to tell Windows Defender to whitelist the folder where the source code resides. There might be slowdowns otherwise.

## Development TODOs

- check crash in linux when closing BG in wmctrl.
