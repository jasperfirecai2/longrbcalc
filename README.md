# Longrbcalc
Long rebirth calculator for NGU idle

Src folder contains JSX style dom writing, 
which gets compiled to 
mithril friendly syntax for the actual script.
This is done using `babel src --outdir <output directory> --source maps`
while in the root directory.

Template.js is not always an exact match of the vnodes in the actual main.js. Just used sometimes to generate big clusters
