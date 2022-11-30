using System.ComponentModel.DataAnnotations;



//check the 148 lesson, important about the date!!!


namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string KnownAs { get; set; }


    }
}

