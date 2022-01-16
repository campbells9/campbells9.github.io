develop:
	cd src && mkdocs serve -a localhost:8000

build:
	cd src && mkdocs build --clean --strict --site-dir ../docs

