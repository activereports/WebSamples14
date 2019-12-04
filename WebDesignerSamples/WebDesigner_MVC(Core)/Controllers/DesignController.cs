using Microsoft.AspNetCore.Mvc;

namespace WebDesignerMvcCore.Controllers
{
	[Route("/")]
	public class DesignController : Controller
	{

		[HttpGet]
		public ActionResult Index([FromQuery(Name = "theme")] string theme = "blue")
		{
			return RedirectToAction("create", new { theme });
		}

		[HttpGet("create")]
		public ActionResult Create([FromQuery(Name = "theme")] string theme = "blue")
		{
			ViewBag.Theme = theme;
			return View("Index");
		}

		[HttpGet("edit/{id}")]
		public ActionResult Edit([FromRoute] string id, [FromQuery(Name = "theme")] string theme = "blue")
		{
			if (string.IsNullOrWhiteSpace(id)) return BadRequest();
			ViewBag.Id = id;
			ViewBag.Theme = theme;
			return View("Index");
		}
	}
}
