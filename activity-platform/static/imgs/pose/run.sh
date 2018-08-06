for fname in `ls`;do newname=`echo $fname | sed 's/0_\([0-9]\)/\1/'`;echo $newname;mv $fname $newname;done
