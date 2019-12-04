using System;
using Microsoft.AspNetCore.Mvc;

namespace WebDesignerMvcCore.Controllers
{
	[Route("preview")]
	public class PreviewController : Controller
	{
		[HttpGet("{id}")]
		public ActionResult Edit([FromRoute] string id, [FromQuery(Name = "theme")] string theme = "blue")
		{
			if (string.IsNullOrWhiteSpace(id)) return BadRequest();
			ViewBag.Id = Uri.UnescapeDataString(id);
			ViewBag.Theme = theme;
			return View("Index");
		}
	}
}
