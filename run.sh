#!/bin/sh
SCRIPTPATH=`dirname "$0"`
chmod u+x "$SCRIPTPATH/fantastic"
"$SCRIPTPATH/fantastic" -importPath fantastic -srcPath "$SCRIPTPATH/src" -runMode prod
