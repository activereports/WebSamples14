using System.Net;
using System.Web.Mvc;

namespace WebDesigner_MVC.Controllers
{
	public class DesignController : Controller
	{
		[Route("")]
		[HttpGet]
		public ActionResult Index()
		{
			var theme = Request.QueryString["theme"] ?? "blue";
			return RedirectToAction("create", new { theme });
		}

		[Route("create")]
		[HttpGet]
		public ActionResult Create()
		{
			var theme = Request.QueryString["theme"] ?? "blue";
			ViewBag.Theme = theme;
			return View("Index");
		}

		[Route("edit/{id}")]
		[HttpGet]
		public ActionResult Edit(string id)
		{
			var theme = Request.QueryString["theme"] ?? "blue";
			if (string.IsNullOrWhiteSpace(id)) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			ViewBag.Id = id;
			ViewBag.Theme = theme;
			return View("Index");
		}
	}
}
