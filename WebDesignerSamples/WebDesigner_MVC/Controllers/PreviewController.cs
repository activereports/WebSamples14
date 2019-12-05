using System;
using System.Net;
using System.Web.Mvc;

namespace WebDesigner_MVC.Controllers
{
	[RoutePrefix("preview")]
	public class PreviewController : Controller
	{
		[Route("{id}")]
		[HttpGet]
		public ActionResult Edit(string id)
		{
			var theme = Request.QueryString["theme"] ?? "blue";
			if (string.IsNullOrWhiteSpace(id)) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			ViewBag.Id = Uri.UnescapeDataString(id);
			ViewBag.Theme = theme;
			return View("Index");
		}
	}
}
