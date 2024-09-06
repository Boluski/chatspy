using System;

namespace chatspy.Utils;

public class Generate
{
    public static string GenerateUserName(string FullName)
    {
        var Id = new Random();
        string username = string.Concat(FullName, Id.Next(99999999).ToString()).Replace(" ", "");
        return username;
    }
}
