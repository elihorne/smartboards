Smartboards aims to make managing artboards easier in Sketch.

## Align and Rename
###### Shortcut: cmd + opt + g

* Aligns artboards to a grid with `100px` gutters
* Renames the artboards based on column (number) and row (letter) [`A00`, `A01`, `B00`, `B01`, `B02`]
* Alphabetizes the artboards in the layers list.

![Screenshot](http://f.cl.ly/items/0d3o2p1Q3R2W2l0c3O25/smartboards.gif)

To install, download "`Smartboards`" as a zip file and then add the folder to your Sketch plugin folder (In Sketch 3, choose `Plugins` > `Reveal Plugins Folder`)

Notes: Gridify expects that artboards are the same size (width and height). It also expects that artboards that are meant to be in the same row are aligned on the same Y-axis value.  It doesn't care about the X-axis value.

There's a slightly hidden feature that I use a lot but is hard to describe.  If you place an artboard in between two rows on the Y-axis and run Gridify, it will create room for a new row by shifting existing rows down by one, and then will rename accordingly.  Imagine you have Artboard 1 that is 10x10 at Y = 1, and Artboard 2 that is 10x10 at Y = 111.  If you place a third artboard where 1 < Y < 111, Gridify will do the rest of the heavy lifting for you. 

![Screenshot](http://f.cl.ly/items/3P2p1M002x3G0W3z1h1S/smartboards-2.gif)

## Align
###### Shortcut: shift + cmd + opt + g

* Aligns artboard to the same grid, but does not rename the artboards.
