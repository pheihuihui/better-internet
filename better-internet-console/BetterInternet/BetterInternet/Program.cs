using System;
using System.Threading;
using System.IO;
using System.Collections.Generic;

namespace BetterInternet
{
    class Program
    {
        const string UrlFileName = "URLs.txt";
        const string PacTailFileName = "pac.js";
        const string PacTXT = "pac.txt";
        static void Main(string[] args)
        {
            string input;
            if(args.Length == 1)
            {
                input = args[0];
            }
            else
            {
                input = "";
            }
            string rules = "";
            foreach(string rl in input.Split("##"))
            {
                rules += rl;
                rules += Environment.NewLine;
            }
            string[] lines = ReadUrlFile(UrlFileName);
            string content = "";
            foreach(string line in lines)
            {
                Console.WriteLine(line);
                content += line;
                content += Environment.NewLine;
            }
            WriteToFile(UrlFileName, content);
            Thread.Sleep(2000);
        }

        static string[] ReadUrlFile(string name)
        {
            string path = Path.Combine(Environment.CurrentDirectory, name);
            string[] content = File.ReadAllLines(path);
            return content;
        }

        static void WriteToFile(string name, string content)
        {
            string path = Path.Combine(Environment.CurrentDirectory, name);
            if (File.Exists(path))
            {
                File.WriteAllText(path, content);
            }
        }
    }
}
