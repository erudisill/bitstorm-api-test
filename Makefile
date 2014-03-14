# setup the upstart service and application directory
#
setup:
	sudo mkdir -p /var/www/bitstorm 2>/dev/null
	sudo chown bitstorm:bitstorm /var/www/bitstorm
	sudo cp ./bitstorm.conf /etc/init
	sudo initctl reload-configuration

# clean the application deployment directory and kill the log
#
clean:
	sudo rm -rf /var/www/bitstorm/*
	sudo rm -f /var/log/bitstorm.log	

# deploy files to the application directory
#
deploy:
	-sudo stop bitstorm
	sudo touch /var/log/bitstorm.log
	sudo chown bitstorm:bitstorm /var/log/bitstorm.log
	sudo rsync -Clr . /var/www/bitstorm
	sudo start bitstorm

# update local staging area from source control
#
update:
	git pull

# shortcuts
#
update-deploy: update deploy

clean-update-deploy: clean update deploy

