package ru.itmo.wp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.itmo.wp.domain.Post;
import ru.itmo.wp.domain.User;
import ru.itmo.wp.exception.ValidationException;
import ru.itmo.wp.form.PostForm;
import ru.itmo.wp.service.JwtService;
import ru.itmo.wp.service.PostService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;
    private final JwtService jwtService;

    public PostController(PostService postService, JwtService jwtService) {
        this.postService = postService;
        this.jwtService = jwtService;
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.findAll();
    }

    @GetMapping("/posts/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping("/posts")
    public Post createPost(@Valid @RequestBody PostForm postForm,
                           BindingResult bindingResult,
                           HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            String firstError = bindingResult.getFieldErrors().get(0).getDefaultMessage();
            throw new RuntimeException(firstError);
        }

        String jwt = request.getParameter("jwt");
        System.out.println(jwt);
        if (jwt == null) {
            jwt = request.getHeader("Authorization");
            if (jwt != null && jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }
        }

        User user = jwtService.find(jwt);
        if (user == null) {
            throw new RuntimeException("User not authenticated");
        }

        return postService.create(user, postForm);
    }
}