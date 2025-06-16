    package com.springboot.rekruteIT.controller;


    import com.springboot.rekruteIT.payload.OffreResponse;
    import com.springboot.rekruteIT.payload.RecruteurDto;
    import com.springboot.rekruteIT.payload.RecruteurResponse;
    import com.springboot.rekruteIT.service.RecruteurService;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api")
    public class RecruteurController {

        private RecruteurService recruteurService;

        public RecruteurController(RecruteurService recruteurService) {
            this.recruteurService = recruteurService;
        }

        @GetMapping("/recruteurs")
        public RecruteurResponse getRecruteurs(
                @RequestParam(value = "pageNo",defaultValue = "0",required = false) int pageNo,
                @RequestParam(value = "PageSize",defaultValue = "10",required = false) int pageSize,
                @RequestParam(value = "sortBy",defaultValue= "userId",required = false) String sortBy,
                @RequestParam(value = "sortDir",defaultValue="ASC",required =false ) String sortDir
        ) {

            return recruteurService.getAllRecruteurs(pageNo,pageSize,sortBy,sortDir);
        }

        @PostMapping("/recruteur/create")
        public ResponseEntity<RecruteurDto> createRecruteur(@RequestBody RecruteurDto recruteurDto) {
            return new ResponseEntity<>(recruteurService.createRecruteur(recruteurDto), HttpStatus.CREATED);
        }

        @GetMapping("/recruteur/{id}")
        public ResponseEntity<RecruteurDto> getRecruteur(@PathVariable int id ){
            return new ResponseEntity<>(recruteurService.getRecruteur(id), HttpStatus.OK);
        }

        @PutMapping("/recruteur/{id}")
        public ResponseEntity<RecruteurDto> updateRecruteur(@PathVariable int id , @RequestBody RecruteurDto recruteurDto ){
            return new ResponseEntity<>(recruteurService.updateRecruteur(id,recruteurDto), HttpStatus.OK);
        }

        @DeleteMapping("/recruteur/{id}")
        public ResponseEntity<RecruteurDto> deleteRecruteur(@PathVariable int id ){
            return new ResponseEntity<>(recruteurService.deleteRecruteur(id), HttpStatus.OK);
        }
    }
