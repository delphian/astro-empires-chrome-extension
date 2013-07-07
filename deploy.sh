#!/bin/sh
# Copy the existing directory structure, cleaning out any git references, then zips the result.

echo "This will copy this entire directory tree, less git related files, into a new tree, and zip up for distribution as a chrome extension."
echo ""
echo "Do you wish to continue? (y/n) "
read INPUT
if [ "$INPUT" == 'y' ]; then
  N=$RANDOM$RANDOM
  # Create a new directory in tmp to hold our distribution.
  mkdir "/tmp/$N"
  # Copy everything into the new directory.
  cp -r . "/tmp/$N"
  # Remove all references to git.
  find "/tmp/$N" -name ".git*" -exec rm -Rf {} \;
  # Remove other files.
  rm "/tmp/$N/deploy.sh"
  rm "/tmp/$N/install.sh"
  zip -r astro-empires-observer "/tmp/$N"
  rm -Rf "/tmp/$N"
fi
