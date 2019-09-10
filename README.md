# <div style='text-align: center' >MeTL Instructions for Group 1 Summer 2019</div>

To see the original readme click [HERE](./README-ORGINAL.md)

### Circle CI Status

[![CircleCI](https://circleci.com/gh/saintleocom430/com430-devopprojectgrp1.svg?style=svg&circle-token=308fc48a52f975c5619922e850e96ccce3484fa2)](https://circleci.com/gh/saintleocom430/com430-devopprojectgrp1)

## Getting Started

#### <em>Install the following required tools:</em>

<u>Check if its already installed:</u> Open terminal (linux/mac) or command prompt (windows) and enter:

    $ npm -v

    $ javac -version

<u>Tools:</u> Locations and instructions

- [Java](www.oracle.com/technetwork/java/javase/downloads) JDK version 8.x. Scroll down to Java SE 8u211 and click download under JDK. [Great resource](https://www3.ntu.edu.sg/home/ehchua/programming/howto/JDK_Howto.html) to ensure environmental variable is set (ignore the version 11 references)

- [NPM](https://www.npmjs.com/get-npm) (Node Package Manager)

- [GitHub for Desktop](https://desktop.github.com/) or [Git CLI](https://help.github.com/en/articles/set-up-git)

#### <em>Clone MeTL via command line</em>

    $ cd /Path/To/Your/Desired/Location

    $ git clone --depth=1 git@github.com:saintleocom430/com430-devopprojectgrp1.git

#### <em>Clone MeTL via GitHub for desktop</em>

- Sign in or create a GitHub account if you haven't already done so.

- On the left hand side you may see a list of repo's, scroll down and click on 1 `saintleocom430/com430-devopprojectgrp1`, if you don't see it click on `clone repository from internet` and then add `saintleocom430/com430-devopprojectgrp1`.

- Choose your desired local path and click clone.

## Installation and Configuration

#### <em>Windows</em>

Open command prompt

    $ cd Path\To\Your\Repo

<u>Set Ivy Home:</u> type each line then press enter.
$ mkdir \ivyHome
    
    $ set IVY_HOME=\ivyHome

<u>Create Configuration:</u> type each line then press enter:

    $ cd config

    $ copy configuration.sample.xml configuration.local.xml

    $ cd ..

<u>Let's Build: </u> type the following line and press enter:

    $ sbt

\*\* This will take a while, get some coffee, do some yoga, and maybe learn more about Scala [Simple Build Tool](https://www.scala-sbt.org/) if your bored.

#### <em>Mac/Linux</em>

\*\* <em>Note: Commands here may vary if you have any issues contact me (Ozzie) and I will try and help you the best I can</em>

Open the terminal app

    $ cd Path/To/Your/repo

<u>Set Ivy Home:</u> This is preset for you in [sbt.sh](./sbt.sh) no need to set.

<u>Create Configuration:</u> type each line then press enter:

    $ cd config

    $ cp configuration.sample.xml configuration.local.xml

    $ cd ..

<u>Let's Build: </u> type the following line and press enter:

    $ sbt

\*\* This will take a while, get some coffee, do some yoga, and maybe learn more about Scala [Simple Build Tool](https://www.scala-sbt.org/) if your bored.

#### <em>Configuring SBT</em>

<em>\*\*We use SBT to compile and publish this app. It is included in the repo as `sbt-launcher.jar`.</em>

Windows and linux are already configured, see sbt.bat (windows) and sbt.sh (linux/mac) is already configured to:

    sbt.boot.directory="%IVY_HOME%\.sbt-boot"

    sbt.global.home="%IVY_HOME%\.sbt"

    sbt.home="%IVY_HOME%\.sbt"

    sbt.ivy.home="%IVY_HOME%\.ivy2\"

    sbt.global.staging="%IVY_HOME%\.sbt-staging"

#### <em>Configuring MeTL</em>

<em>\*\* We already created this file during setup!</em>

- `metlx.configurationFile="./config/configuration.local.xml"` sets the location of the MeTL config file.

See [README-config.md](README-config.md) for more detail.

#### <em>Configuring Logback</em>

<em>\*\* Just information no action needed.</em>

MeTL uses Logback, which can be overridden to use a config file from outside the WAR.

- `logback.configurationFile="config/logback.xml"` sets the location of the Logback config file.

See [Logback](https://logback.qos.ch/manual/index.html) for more detail.

#### <em>Developer Options</em>

<em>\*\* No action needed at this time, may need later.</em>

- `run.mode="development"` instructs Lift to disable most caching (see [Simply Lift](https://simply.liftweb.net/index-3.1.html#toc-Subsection-3.1.2)).
- `metl.stopwatch.enabled="true"` enables duration logging of various actions.
- `metl.stopwatch.minimumLog="1000"` requires that an action take longer than 1s before it is logged.
- `stackable.spending=enabled` enables use of third-party services defined in [README-config.md](README-config.md). This will also require configuring access credentials for each service.

## Run

To run a local (development) server for this app, use:

#### <em>Windows</em>

    $ sbt container:start

#### <em>Mac/Linux</em>

    $ chmod u+x sbt.sh

    $ ./sbt.sh

    $ container:start

- Other useful commands include: `sbt container:stop` and `sbt container:restart`.

## When Developing do this...

Never modify or commit changes directly to master. Instead do the following steps (command line instructions):

- Create a new branch for your feature
  - `git checkout -b feature_name origin/feature_name`
- Modify your branch
  - When programming in your new branch start sbt interactively by running `~container:start`
  - After making changes to html you don't have to refresh. Changes to Javascript you need to run `./minify.sh` (linux/mac) `./minify.bat` (windows).
  - Because you are interactive you can simply refresh the browser when it is complete and see the changes.
- Commit your changes
  - When your ready to commit save your work and then `git commit -am "desciption of your changes"` then `git push`
- open up a Pull Request
  - In GitHub go to your repositories Pull Request tab
  - Click on New Pull Request
  - Keep base:master and change compare:master to your feature branch.
  - Add a describe your changes and then open the Pull Request.
- Approve the Pull Request
  - Have someone else with write permissions review your code
  - When they are ready, have them scroll down until they see "add review" and have them approve or request changes.
- Merge the PR
  - Once approved you should have the option to merge. Merge takes your branch and adds it to the master exactly as is. If you have a lot of meaningless commits, I recommend Squash and Merge. This takes all of your commits and squashes them all into one commit before adding your changes to master. This is useful when you want to keep your master branches commit history clean and organized. Up to your team how you want to handle this.
  - And your done.
- Update your local master branch
  - now on the command line enter `git checkout master` then `git fetch origin` then ``git pull`. This updates your local master branch to include your new changes.

#### More documentation modifications coming soon ....
