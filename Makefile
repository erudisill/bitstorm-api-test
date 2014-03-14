setup:
	sudo mkdir -p /var/www/bitstorm
	sudo chown bitstorm:bitstorm /var/www/bitstorm
	sudo cp ./bitstorm.conf /etc/init
	sudo initctl reload-configuration

deploy:
	sudo stop bitstorm
	sudo touch /var/www/bitstorm.log
	sudo chown bitstorm:bitstorm /var/www/bitstorm.log
	sudo rsync -Clr . /var/www/bitstorm
	sudo start bitstorm

update:
	git pull

update-deploy: update deploy
	echo "update-deploy target"
