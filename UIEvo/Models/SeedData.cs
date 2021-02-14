using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using UIEvo.Data.AppDb;

namespace UIEvo.Models
{
    public static class SeedData
    {
        public static void InitializeAppDb(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager, IOptions<AdminSettings> options)
        {
            var _appSettings = options.Value;
            var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

            if (!context.Users.Any())
            {
                var user = new ApplicationUser
                {
                    UserName = _appSettings.AdminUsername,
                    Email = _appSettings.AdminUsername,
                    EmailConfirmed = true
                };

                IdentityResult result = userManager.CreateAsync(user, _appSettings.AdminPassword).Result;

                if (result.Succeeded)
                {
                    context.SaveChanges();
                }
            }            

            if (context.PortfolioPosts.Any())
            {
                return;
            }

            context.PortfolioPosts
                .AddRange(
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Single-page application uievo.com",
                    CustomerTitle = "Own project",
                    Location = "uievo.com",
                    StartDate = new DateTimeOffset(new DateTime(2020, 5, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2020, 6, 1)),
                    ImageSource = "/img/uploads/img_uievospa.jpg",
                    VideoSource = "https://www.youtube.com/embed/s6O1mZ1PzOg",
                    MainText = "A tile for this website was created to address the following: 1) I wanted " +
                    "to demonstrate the website's control panel which is not available for regular visitors; " +
                    "2) I needed a place to provide a link to source code of this project on GitHub. This " +
                    "single-page application is designed from scratch and is built using C# programming language, " +
                    "ASP.NET Core framework (API), and MySQL database for server-side logic as well as " +
                    "TypeScript programming language, React and Redux libraries, React Bootstrap " +
                    "framework for client-side logic. It is deployed to AWS Linux. ",
                    PlayStoreSource = "https://github.com/volodymyr-karpenko/UIEvoSPA",
                    PlayStoreText = "uievo.com SPA on GitHub",
                    Footer = "Video overview and source code available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Patterns.TypeScript",
                    CustomerTitle = "Own project",
                    Location = "uievo.com",
                    StartDate = new DateTimeOffset(new DateTime(2020, 4, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2020, 4, 1)),
                    ImageSource = "/img/uploads/img_patternstypescript.jpg",
                    VideoSource = "https://www.youtube.com/embed/R6Ri9euKi7o",
                    MainText = "Patterns.TypeScript is an open-source sample cross-platform app that is " +
                    "built with ASP.NET Core, React, Redux application template from Visual Studio to " +
                    "demonstrate 23 GoF design patterns via TypeScript using simplistic samples.",
                    PlayStoreSource = "https://github.com/volodymyr-karpenko/Patterns.TypeScript",
                    PlayStoreText = "Patterns.TypeScript on GitHub",
                    Footer = "Video overview and source code available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Patterns.CSharp",
                    CustomerTitle = "Own project",
                    Location = "uievo.com",
                    StartDate = new DateTimeOffset(new DateTime(2020, 3, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2020, 3, 1)),
                    ImageSource = "/img/uploads/img_patternscsharp.jpg",
                    VideoSource = "https://www.youtube.com/embed/WPO6o2MKIQE",
                    MainText = "Patterns.CSharp is an open-source sample cross-platform app that is " +
                    "built with ASP.NET Core API and React-with-Redux project template from Visual Studio " +
                    "to demonstrate 23 GoF design patterns via C# using simplistic samples.",
                    PlayStoreSource = "https://github.com/volodymyr-karpenko/Patterns.CSharp",
                    PlayStoreText = "Patterns.CSharp on GitHub",
                    Footer = "Video overview and source code available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Sliders",
                    CustomerTitle = "Own project",
                    Location = "uievo.com",
                    StartDate = new DateTimeOffset(new DateTime(2020, 2, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2020, 2, 1)),
                    ImageSource = "/img/uploads/img_sliders.jpg",
                    VideoSource = "https://www.youtube.com/embed/zrHmJJ7iTZE",
                    MainText = "Sliders is an open-source sample cross-platform app for Android " +
                    "Tablet/iOS iPad that is built with ASP.NET Core API, Xamarin, and MvvmCross. " +
                    "IDEA: Let's assume that you have an IoT device that measures some environment " +
                    "once per second. To give you a better understanding of the environment's state " +
                    "at a certain point in time, each measurement consists of five markers presented as sliders. " +
                    "When each measurement is completed, an IoT device sends the data to a database " +
                    "in the following format: measurement ID, measurement timestamp in the UTC format, " +
                    "slider 1, slider 2, slider 3, slider 4, slider 5. OBJECTIVE: Create a server-side logic - " +
                    "the ASP.NET Core API that talks to a database and a client-side logic - the Xamarin " +
                    "MVVM mobile application that talks to the API. A client-side logic requests the latest " +
                    "available measurement from a given database, then it presents that measurement to " +
                    "the user for one second, and after that, it requests another measurement, and so forth. " +
                    "Other than that a client-side logic also creates random measurement data every " +
                    "second and sends it to a database because there is no actual IoT device.",
                    PlayStoreSource = "https://github.com/volodymyr-karpenko/Sliders",
                    PlayStoreText = "Sliders on GitHub",
                    Footer = "Video overview and source code available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Single screen for a mobile app",
                    CustomerTitle = "Jörg A.",
                    Location = "Germany",
                    StartDate = new DateTimeOffset(new DateTime(2019, 10, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2019, 10, 1)),
                    ImageSource = "/img/uploads/img_crypto.jpg",
                    VideoSource = "https://www.youtube.com/embed/cqGhW4On3vo",
                    MainText = "A single screen for a mobile app is a cross-platform Xamarin.Forms " +
                    "project for iOS and Android mobile devices. My task was to deliver the View, its " +
                    "ViewModel, and client-side logic to request JSON data from the API. The API itself " +
                    "was not ready at that moment, so I created an ApiResponse.json file to simulate " +
                    "the response and provide its deserialization into the Model objects. Requirements " +
                    "for the UI were provided as an image file of the screen and there also was an ask " +
                    "to use random FontAwesome icons for the list items.",
                    Footer = "Video overview available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Corporate website with a blog",
                    CustomerTitle = "Walinger Systems Limited",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2019, 9, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2019, 9, 1)),
                    ImageSource = "/img/uploads/img_walinger.jpg",
                    MainText = "Corporate website with a blog is an ASP.NET Core MVC project. " +
                    "My task was to design and develop a responsive (Bootstrap) website in order " +
                    "to renew the old one. ASP.NET source code of the old website was provided.",
                    PlayStoreSource = "http://www.walingersystems.co.uk/",
                    PlayStoreText = "walingersystems.co.uk",
                    Footer = "Available online"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Special offers app",
                    CustomerTitle = "Square Root Software Limited",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2018, 8, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2019, 3, 1)),
                    ImageSource = "/img/uploads/img_offers.jpg",
                    VideoSource = "https://www.youtube.com/embed/zC4VvAlINVs",
                    MainText = "Special offers app is a cross-platform Xamarin.Forms project for iOS and Android " +
                    "mobile devices. My task was to create views for the app and deliver responsive UI development " +
                    "including the client-side logic for data-driven UI components. UI designs for the phone version of " +
                    "the app were provided.",
                    Footer = "Video overview available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Turnovers",
                    CustomerTitle = "Walinger Systems Limited",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2018, 12, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2019, 2, 1)),
                    ImageSource = "/img/uploads/img_turnovers.jpg",
                    VideoSource = "https://www.youtube.com/embed/j5Twq8h5hcQ",
                    MainText = "Turnovers app is an income (expense) control app with ads. It is a cross-platform " +
                    "Xamarin.Forms project for iOS and Android mobile devices. My task was to design and develop " +
                    "the app from scratch.",
                    Footer = "Video overview available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Custom dropdown list",
                    CustomerTitle = "Walinger Systems Limited",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2019, 1, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2019, 1, 1)),
                    ImageSource = "/img/uploads/img_dropdown.jpg",
                    VideoSource = "https://www.youtube.com/embed/ClM27U_Kz-E",
                    MainText = "Custom dropdown list is a cross-platform Xamarin.Forms project for iOS and " +
                    "Android mobile devices. My task was to deliver the design and development of this UI " +
                    "component. Schematic wireframe was provided.",
                    Footer = "Video overview available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Certification app",
                    CustomerTitle = "Walinger Systems Limited",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2018, 7, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2018, 11, 1)),
                    ImageSource = "/img/uploads/img_electro.jpg",
                    VideoSource = "https://www.youtube.com/embed/PlGGWKpW7VE",
                    MainText = "Certification app is a cross-platform Xamarin.Forms project for iOS and " +
                    "Android mobile devices. My task was to create views for the app and deliver responsive " +
                    "UI design and development. Schematic wireframes were provided.",
                    Footer = "Video overview available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "TCards Online",
                    CustomerTitle = "Snapwire Software",
                    Location = "United Kingdom",
                    StartDate = new DateTimeOffset(new DateTime(2018, 6, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2018, 10, 1)),
                    ImageSource = "/img/uploads/img_tcards.jpg",
                    MainText = "TCards Online - a companion app for www.tcardsonline.co.uk. This is a cross-platform " +
                    "Xamarin.Forms project for iOS and Android mobile devices. My task was to deliver UI design and " +
                    "development, client-side logic development.",
                    Footer = "Currently not available"
                },
                new PortfolioPostModel
                {
                    Id = Guid.NewGuid().ToString(),
                    Header = "Corporate website with a news line",
                    CustomerTitle = "Inspektsia z blahoustroiu m. Zhytomyra, Municipal Enterprise",
                    Location = "Ukraine",
                    StartDate = new DateTimeOffset(new DateTime(2017, 8, 1)),
                    FinishDate = new DateTimeOffset(new DateTime(2017, 10, 1)),
                    ImageSource = "/img/uploads/img_blagoustrii.jpg",
                    MainText = "Corporate website with a news line is a WordPress project. My task was to design, " +
                    "develop and deploy a responsive website (a WordPress custom theme made from scratch) in order " +
                    "to provide the enterprise's online presence. After the website was deployed my task was to assist " +
                    "the enterprise's associate to learn how to administrate it.",
                    PlayStoreSource = "http://blagoustrii.zt.ua/",
                    PlayStoreText = "blagoustrii.zt.ua",
                    Footer = "Available online"
                });

            context.SaveChanges();
        }
    }
}
