var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var colleges = [
        {
            Name: 'University of Alabama',
            State: 'Alabama',
            Website: 'http://ua.edu',
            Facebook: 'https://m.facebook.com/universityofalabama',
            Twitter: 'https://twitter.com/UofAlabama',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/14134732_1774180226140298_632293549_a.jpg'
        },
        {
            Name: 'University of Arizona',
            State: 'Arizona',
            Website: 'http://arizona.edu',
            Facebook: 'https://www.facebook.com/uarizona/',
            Twitter: 'https://twitter.com/UofA',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/10617023_729337447156645_1383022783_a.jpg'
        },
        {
            Name: 'Stanford University',
            State: 'California',
            Website: 'http://stanford.edu',
            Facebook: 'https://www.facebook.com/stanford/',
            Twitter: 'https://twitter.com/Stanford',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/10724659_1490326554553807_417700412_a.jpg'
        },
        {
            Name: 'University of California, Los Angeles',
            State: 'California',
            Website: 'www.ucla.edu/',
            Facebook: 'https://www.facebook.com/uclabruins/',
            Twitter: 'https://twitter.com/UCLA',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/11850365_493790720798067_2067388662_a.jpg'
        },
        {
            Name: 'University of Denver',
            State: 'Colorado',
            Website: 'http://du.edu',
            Facebook: 'https://www.facebook.com/uofdenver/',
            Twitter: 'https://twitter.com/UofDenver',
            Image: 'https://pbs.twimg.com/profile_images/867764020035637249/NDI6o-7x_400x400.jpg'
        },
        {
            Name: 'Yale University',
            State: 'Connecticut',
            Website: 'http://yale.edu',
            Facebook: 'https://www.facebook.com/YaleUniversity/',
            Twitter: 'https://twitter.com/Yale',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/12751534_589937674508660_2140180646_a.jpg'
        },
        {
            Name: 'Georgetown University',
            State: 'District of Columbia',
            Website: 'http://georgetown.edu',
            Facebook: 'https://www.facebook.com/georgetownuniv/',
            Twitter: 'https://twitter.com/Georgetown',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/11909155_1706081576282175_60002729_a.jpg'
        },
        {
            Name: 'University of Florida',
            State: 'Florida',
            Website: 'http://ufl.edu',
            Facebook: 'https://www.facebook.com/uflorida/',
            Twitter: 'https://twitter.com/UF',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/11363668_1478751502435402_817731226_a.jpg'
        },
        {
            Name: 'University of Georgia',
            State: 'Georgia',
            Website: 'http://uga.edu',
            Facebook: 'https://www.facebook.com/universityofga/',
            Twitter: 'https://twitter.com/universityofga',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/14156471_1692711964386542_92798886_a.jpg'
        },
        {
            Name: 'Northwestern University',
            State: 'Illinois',
            Website: 'http://northwestern.edu',
            Facebook: 'https://www.facebook.com/NorthwesternU/',
            Twitter: 'https://twitter.com/NorthwesternU',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/11311534_1036212059736471_161883478_a.jpg'
        },
        {
            Name: 'Purdue University',
            State: 'Indiana',
            Website: 'http://purdue.edu',
            Facebook: 'https://www.facebook.com/PurdueUniversity/',
            Twitter: 'https://twitter.com/LifeAtPurdue',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/14134732_1774180226140298_632293549_a.jpg'
        },
        {
            Name: 'Iowa State University',
            State: 'Iowa',
            Website: 'http://iastate.edu',
            Facebook: 'https://www.facebook.com/IowaStateU/',
            Twitter: 'https://twitter.com/IowaStateU',
            Image: 'http://cdn.wallpapersafari.com/26/27/RW0jkO.jpg'
        },
        {
            Name: 'University of Kentucky',
            State: 'Kentucky',
            Website: 'www.uky.edu/',
            Facebook: 'https://www.facebook.com/universityofky/',
            Twitter: 'https://twitter.com/universityofky',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/10268749_507659852750207_1288854045_a.jpg'
        },
        {
            Name: 'Louisiana State University',
            State: 'Louisiana',
            Website: 'http://lsu.edu',
            Facebook: 'https://www.facebook.com/geauxlsu/',
            Twitter: 'https://twitter.com/lsu',
            Image: 'https://pbs.twimg.com/profile_images/382296603/lsu_logo2_400x400.jpg'
        },
        {
            Name: 'University of Michigan',
            State: 'Michigan',
            Website: 'http://umich.edu',
            Facebook: 'https://www.facebook.com/UniversityOfMichigan/',
            Twitter: 'https://twitter.com/UMich',
            Image: 'https://pbs.twimg.com/profile_images/815660088937459712/VWcMswj7_400x400.jpg'
        },
        {
            Name: 'Rutgers, The State University of New Jersey, New Brunswick',
            State: 'New Jersey',
            Website: 'www.rutgers.edu/',
            Facebook: 'https://www.facebook.com/RutgersU/',
            Twitter: 'https://twitter.com/rutgersu?lang=en',
            Image: 'https://pbs.twimg.com/profile_images/809450270375772160/rWmyBIig_400x400.jpg'
        },
        {
            Name: 'Syracuse University',
            State: 'New York',
            Website: 'http://syr.edu',
            Facebook: 'https://www.facebook.com/syracuseuniversity/',
            Twitter: 'https://twitter.com/SyracuseU',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/s150x150/12547341_1040594609319973_968235835_a.jpg'
        },
        {
            Name: 'University of North Carolina, Chapel Hill',
            State: 'North Carolina',
            Website: 'www.unc.edu/',
            Facebook: 'https://www.facebook.com/uncchapelhill/',
            Twitter: 'https://twitter.com/UNC',
            Image: 'http://richmondcc.edu/sites/default/files/unclogo.png'
        },
        {
            Name: 'University of Oregon',
            State: 'Oregon',
            Website: 'http://uoregon.edu',
            Facebook: 'https://www.facebook.com/universityoforegon/',
            Twitter: 'https://twitter.com/goducks?lang=en',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/11850273_1663780953866232_1493852733_a.jpg'
        },
        {
            Name: 'Temple University',
            State: 'Pennsylvania',
            Website: 'http://temple.edu',
            Facebook: 'https://www.facebook.com/templeu/',
            Twitter: 'https://twitter.com/TempleUniv',
            Image: 'https://scontent-lga3-1.cdninstagram.com/t51.2885-19/10954457_371615229687090_912055651_a.jpg'
        }];

var router = function (nav) {

    adminRouter.route('/addColleges')
        .get(function (req, res) {
            var url =
                'mongodb://<ec>:<ec123>@ds125053.mlab.com:25053/college-connection';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('colleges');
                collection.insertMany(colleges,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );

            });

            //res.send('inserting colleges');
        });

    return adminRouter;
};

module.exports = router;