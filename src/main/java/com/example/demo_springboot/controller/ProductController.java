package com.example.demo_springboot.controller;

import com.example.demo_springboot.model.Product;
import com.example.demo_springboot.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/products")
public class ProductController {
    @Autowired
    private IProductService iProductService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return new ResponseEntity<>(iProductService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Long id) {
        Optional<Product> optionalProduct = iProductService.findById(id);
        if (optionalProduct.isPresent()) {
            return new ResponseEntity<>(optionalProduct.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return new ResponseEntity<>(iProductService.save(product), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Product> update(@RequestBody Product product) {
        Optional<Product> optionalProduct = iProductService.findById(product.getId());
        if (optionalProduct.isPresent()) {
            return new ResponseEntity<>(iProductService.save(product), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> delete(@PathVariable("id") Long id) {
        iProductService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
