urlstatus=$(curl -o /dev/null --silent --write-out '%{http_code}' "https://quartech.app/api/v1/health" )
if [ "$urlstatus" != '200' ]; then
    echo "" | mail -s "Server health check returned $urlstatus" devin.smith@quartech.com emiliano.sune@quartech.com nick.phura@quartech.com brad.head@quartech.com
fi

: '
Unfortunately digital ocean does not support out of the box health checks unless a load balancer is in use (which is not free).
As a result this script is a stopgap solution, with the following drawbacks.
1) The script must be run on the server, as a result, if something catastrophic happens to the droplet we wont recieve a notification. Digital Ocean
    should mitigate this risk by its nature as a high-availability cloud service.
2) The script requires manual cron setup and SMTP setup. This adds overhead to the project if we decide to move the service to a new platform. Hopefully
    whatever platform we move to supports some kind of configurable health check and this script will no longer be necessary.

INSTALLATION STEPS:
1) Setup the SMTP server using the steps here: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-16-04
    NOTE: we use port 80 and port 443 for our app, so you will need to manually tweak the the nginx.conf used by postfix to point to a different port.
2) Setup DKIM: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy
3) Ensure that the droplet is configured properly for reverse DNS: https://www.digitalocean.com/community/questions/how-do-i-set-up-reverse-dns-for-my-ip
    (requires that the droplet name is the same as the domain. See screenshot in this folder for more details)
4) Copy the script to /etc/cron.hourly and setup a cronjob with crontab -e , the following is for an hourly run: 0 * * * * /etc/cron.hourly/checkurls.sh
'