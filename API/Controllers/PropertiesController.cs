using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    [Authorize]
    public class PropertiesController : BaseApiController
    {
        private readonly IToolPropertiesRepository _toolPropertiesRepository;
        private readonly IToolsRepository _toolsRepository;
        public PropertiesController(IToolsRepository toolsRepository, IToolPropertiesRepository toolPropertiesRepository)
        {
            this._toolsRepository = toolsRepository;
            this._toolPropertiesRepository = toolPropertiesRepository;
        }

        [HttpPost("{toolname}")]
        public async Task<ActionResult> AddChanges(string toolname)
        {
            var sourceToolId = await _toolsRepository.GetToolsByToolnameAsync(toolname);
            var toolProp = await _toolPropertiesRepository.GetToolsWithProperties(sourceToolId.Id);
            var toolPropId = toolProp.Id;

            if (sourceToolId == null) return NotFound();

            var toolProperties = await _toolPropertiesRepository.GetToolToolProperties(sourceToolId.Id, toolPropId);

            toolProperties = new ToolToolProperties
            {
                ToolId = sourceToolId.Id,
                ToolPropertiesId = toolPropId
            };

            toolProp.ToolToolProperties.Add(toolProperties);

            if (await _toolsRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to update tool properties");
        }
    }
}