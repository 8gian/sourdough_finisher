all:
	tsc --project tsconfig.json 
	rsync -a --exclude "*~" --exclude ".*.sw?" --exclude "*.ts" src/ scripts/

clean:
	-rm scripts/ts/*.*
	find . -name *~ | xargs rm -f
