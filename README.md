##### Smartboards aims to make managing and exporting artboards easier in Sketch.

# Installation

#### Easiest Method
Use the terrific [Sketch Toolbox](http://sketchtoolbox.com/).  Just search for `Smartboards` and click "`Install`"

#### Slightly Harder
Download `Smartboards` [as a zip file](https://github.com/elihorne/smartboards/archive/master.zip) and then add the folder to your Sketch plugin folder.

How to find your Sketch plugin folder: (In Sketch 3) choose `Plugins` > `Manage Plugins...` then click the cog icon near the bottom left corner, and select `Show Plugins Folder`.  

# Features

#### Align and Rename
> Shortcut: <kbd>cmd</kbd> + <kbd>opt</kbd> + <kbd>g</kbd>

* Aligns artboards to a grid with `100px` gutters
* Renames the artboards based on column (number) and row (letter) [`A00`, `A01`, `B00`, `B01`, `B02`]
* Organizes the artboards in the layers list by row and column.

![Screenshot](http://f.cl.ly/items/0d3o2p1Q3R2W2l0c3O25/smartboards.gif)

Notes: `Align` expects that artboards are the same size (width and height). It also expects that artboards that are meant to be in the same row are aligned on the same Y-axis value.  It doesn't care about the X-axis value.

There's a slightly hidden feature that I use a lot but is hard to describe.  If you place an artboard in between two rows on the Y-axis and run `Align`, it will create room for a new row by shifting existing rows down by one, and then will rename accordingly.  Imagine you have `Artboard 1` that is `10x10` at `Y = 1`, and `Artboard 2` that is `10x10` at `Y = 111`.  If you place a third artboard where `1 < Y < 111`, `Align` will do the rest of the heavy lifting for you. 

![Screenshot](http://f.cl.ly/items/3P2p1M002x3G0W3z1h1S/smartboards-2.gif)

#### Align
>Shortcut: <kbd>shift</kbd> + <kbd>cmd</kbd> + <kbd>opt</kbd> + <kbd>g</kbd>

Aligns artboard to the same grid, but does not rename the artboards. Use this if you don't want your artboard names messed with. `Align and Rename` does its best to preserve custom artboard names, but sometimes you might not want it. 
