@echo off
setlocal enableDelayedExpansion
FOR /l %%N in (151,1,200) do (
    set "NUM=00%%N"
    set "DIRNAME=Set_!NUM:~-3!"
    md !DIRNAME!
)