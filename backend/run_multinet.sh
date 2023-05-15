#!/usr/bin/bash
#
# Use this script to run a test multinet.
#
# Sending one transaction to a node will propogate it to
# the rest of the nodes and they should be able to be queried.

python3 app -p 4242
python3 app -p 2222
python3 app -p 3333

