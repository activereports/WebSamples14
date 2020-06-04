using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JSViewer_Blazor.Data
{
    public class ReportsService
    {
        public static string EmbeddedReportsPrefix = "JSViewer_Blazor.Reports";
        public IEnumerable<string> GetReports()
        {
            string[] validExtensions = { ".rdl", ".rdlx", ".rdlx-master" };
            return GetEmbeddedReports(validExtensions);

        }
        private static string[] GetEmbeddedReports(string[] validExtensions) =>
            typeof(ReportsService).Assembly.GetManifestResourceNames()
                .Where(x => x.StartsWith(EmbeddedReportsPrefix))
                .Where(x => validExtensions.Any(x.EndsWith))
                .Select(x => x.Substring(EmbeddedReportsPrefix.Length + 1))
                .ToArray();

    }
}
