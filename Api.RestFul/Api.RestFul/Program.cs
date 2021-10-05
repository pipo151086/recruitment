using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                // your code 
                CreateHostBuilder(args).Build().Run();
            }
            catch (AggregateException e)
            {
                throw e;
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            try
            {
                // your code 
                return Host.CreateDefaultBuilder(args)
                    .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.UseStartup<Startup>();
                    });
            }
            catch (AggregateException e)
            {
                throw e;
            }
            
        }
    }
}
