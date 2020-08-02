const { Router } = require("express");
const router = Router();

const tokenDAO = require("../daos/note");


// POST / - If the user is logged in, it should store the incoming note along with their userId

router.post("/", async (req, res, next) => {
    const { user, password } = req.body
  
 
      const user = await tokenDAO.create(req.body);
  
    } catch (e) {
      next(e);
    }
  });
  
// GET / - If the user is logged in, it should get all notes for their userId

router.get("/", async (req, res, next) => {
    const { user, password } = req.body
  
 
      const user = await tokenDAO.create(req.body);
  
    } catch (e) {
      next(e);
    }
  });

// GET /:id - If the user is logged in, it should get the note with the provided id and that has their userId


  

module.exports = router;
