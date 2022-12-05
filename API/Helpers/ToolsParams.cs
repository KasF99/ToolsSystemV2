using System;
using System.Globalization;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace API.Helpers
{
    public class ToolParams
    
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        // public DateTime minDate { get; set; } = DateTime.Today;
        public DateTime minDate { get; set; } = DateTime.ParseExact("01/01/2000", "dd/MM/yyyy", CultureInfo.InvariantCulture);
        public DateTime maxDate { get; set; } = DateTime.ParseExact("01/01/2050", "dd/MM/yyyy", CultureInfo.InvariantCulture);
        // public string CurrentUsername { get; set; }
        // public string Gender { get; set; }
        // public int MinAge { get; set; } = 18;
        // public int MaxAge { get; set; } = 150;
        // public string OrderBy { get; set; } = "lastActive";
    }
}