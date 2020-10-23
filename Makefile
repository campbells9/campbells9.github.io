develop:
	cd src && mkdocs serve -a 0.0.0.0:8000

build:
	cd src && mkdocs build --clean --strict --site-dir ..

