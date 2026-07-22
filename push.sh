#!/bin/bash
docker save tds-quiz:latest | pv | ssh -C usbi docker load 