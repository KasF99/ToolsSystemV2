using System.Collections.Generic;
using System;
using System.Globalization;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace API.Helpers
{
    public class ToolParams

    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 20;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public DateTime minDate { get; set; } = DateTime.ParseExact("01/01/2000", "dd/MM/yyyy", CultureInfo.InvariantCulture);
        public DateTime maxDate { get; set; } = DateTime.ParseExact("01/01/2050", "dd/MM/yyyy", CultureInfo.InvariantCulture);
        public string orderBy { get; set; } = "dateOfService";
        public string owner { get; set; }
        public string toolname { get; set; }

    }
}