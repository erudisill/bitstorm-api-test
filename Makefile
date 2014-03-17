APP_DIR  := /var/www/bitstorm
LOG_DIR  := /var/log
BS_USER  := bitstorm
BS_GROUP := bitstorm


# setup the upstart service and application directory
# - create the application directory, pipe "exists" errors to null
# - set ownership of application dir to bitstorm user/group
# - copy upstart script to appropriate location
# - tell upstart services to reload the configuration
setup:
	sudo mkdir -p $(APP_DIR)  2>/dev/null
	sudo chown $(BS_USER):$(BS_GROUP) $(APP_DIR)
	sudo cp ./bitstorm.conf /etc/init
	sudo initctl reload-configuration

# clean the application deployment directory and kill the log
#
clean:
	sudo rm -rf $(APP_DIR)/*
	sudo rm -f $(LOG_DIR)/bitstorm.log	

# deploy files to the application directory
#
deploy:
	-sudo stop bitstorm
	sudo touch $(LOG_DIR)/bitstorm.log
	sudo chown $(BS_USER):$(BS_GROUP) $(LOG_DIR) 
	sudo rsync -Clr . $(APP_DIR)
	sudo start bitstorm

# update local staging area from source control
#
update:
	git pull

# shortcuts
#
update-deploy: update deploy

clean-update-deploy: clean update deploy

