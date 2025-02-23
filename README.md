# BG partner

BG (Baldur's Gate) partner is a windows/linux (32 and 64 bits respectively) companion tool for the 2.6.6 versions of Baldur's Gate and Baldur's Gate II: Shadows of Amn. It produces overlays on user-selected creatures detailing their stats and effects.

## Acknowledgments

Though implemented from scratch, this project draws heavily from [BG2RadarOverlay](https://github.com/tapahob/BG2RadarOverlay) and [EEEx's documentation](https://eeex-docs.readthedocs.io).

## Quickstart

Go to [releases](https://github.com/gatperdut/bg-partner/releases) and download the version for your OS into your game folder.

Run the executable after reading these next sections.

Whether you run first BG partner and then the game, or viceversa, is irrelevant.

### Configuration

On its first execution BG partner will create a file called `bg-partner.json` where it stores its configuration, which you can edit. These are the default values:

```
  {
    "exe": "BaldursGateII" / "Baldur.exe",
    "display": null,
    "ms": 300,
    "accelBorderless": "CommandOrControl+Q",
    "accelSheet": "CommandOrControl+A",
  };

```

- `exe`: name of the executable. On Windows this is always `Baldur.exe`. On Linux it is either `BaldursGate` or `BaldursGateII`.

- `display`: `null` to use your primary display, or a number between 0 and 1 less than your number of displays (`0` or `1` if you have two displays, for example). May require a bit of trial and error, though `0` most likely corresponds to your primary display. Run the game in whatever display you select here.

- `ms`: refresh rate in milliseconds.

- `accelBorderless`: shortcut to make the game's window fullscreen borderless.

- `accelSheet`: shortcut to open the overlay when the mouse is over the selection circle of a creature.

Note that both `accelBorderless` and `accelSheet` need to follow the pattern indicated by [Electron's accelerators](https://www.electronjs.org/docs/latest/api/accelerator).

### Windows

Simply run the executable.

### Linux

Linux is a bit more involved.

First off, ASLR (address space layout randomization) needs to be disabled and process tracing needs to be allowed. The following commands will take care of changing the system settings, but these will not survive a system restart.

- ASLR: `echo 0 | sudo tee /proc/sys/kernel/randomize_va_space`
- ptrace: `echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope`

There are ways the changes permanent, but that is not recommended. Re-run the commands next time you boot up the computer and want to use BG partner.

When you are done with BG partner, exchange the `0` with a `1` in the commands and run them again (or simply restart).

Additionally, make sure the following tools are available:

- `xdotool`
- `wmctrl`

You can use `apt`, `pacman`, etc. For example, `sudo apt install xdotool`.

## Bugs and reports

BG partner is very much in development, specially when it comes to testing under different environments. So far, only the Steam version of the games under Ubuntu / Windows 11 are officially supported.

If you encounter problems or would like to share your suggestions please note them down [here](https://github.com/gatperdut/bg-partner/issues).

## Development

Same requirements apply as for running BG partner in your OS of choice.

Additionally:

- Check `.nvmrc` for the Node.js version. On Linux, `nvm use`.
- `npm i` to install dependencies.
- `npm run start` to launch.

[Visual Studio Code](https://code.visualstudio.com/) is a good IDE to consider.

You may need to whitelist in Windows Defender the folder where the source code resides. There might be slowdowns otherwise.

## Publishing

`GITHUB_TOKEN` must be available in the path.

- Windows: `$Env:GITHUB_TOKEN="<token>"`

- Linux: `export GITHUB_TOKEN=<token>`
