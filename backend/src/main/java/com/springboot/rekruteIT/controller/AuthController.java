package com.springboot.rekruteIT.controller;

import com.springboot.rekruteIT.entity.Role;
import com.springboot.rekruteIT.entity.User;
import com.springboot.rekruteIT.payload.CodeVerificationDto;
import com.springboot.rekruteIT.payload.JWTAuthResponse;
import com.springboot.rekruteIT.payload.LoginDto;
//import com.springboot.rekruteIT.payload.SignUpDto;
import com.springboot.rekruteIT.payload.SignupDto;
import com.springboot.rekruteIT.repository.RoleRepository;
import com.springboot.rekruteIT.repository.UserRepository;
import com.springboot.rekruteIT.security.JwtTokenProvider;
import com.springboot.rekruteIT.utils.EmailVerificationService;
import com.springboot.rekruteIT.utils.VerificationCodeStore;
import com.springboot.rekruteIT.utils.VerificationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private EmailVerificationService emailVerificationService;
//
    @Autowired
    private VerificationCodeStore codeStore;
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private User_rolesRepository roleRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;


    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody CodeVerificationDto verificationDto) {
        String email = verificationDto.getEmail();
        String code = verificationDto.getCode();

        VerificationData data = codeStore.getData(email);
        System.out.println(data);

        if (data != null && data.getCode().equals(code)) {
            codeStore.removeCode(email);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, data.getPassword())
            );

            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            User user = userOptional.get();
            String token = tokenProvider.generateToken(authentication);

            if (!user.getRoles().isEmpty()) {
                String primaryRole = user.getRoles().iterator().next().getName();
                JWTAuthResponse response = new JWTAuthResponse(token, user.getUsername(), user.getEmail(), primaryRole   ,             user.getUserId()
                );
                return ResponseEntity.ok(response);
            }
            JWTAuthResponse response = new JWTAuthResponse(token);
            response.setUsername(user.getUsername());
            response.setEmail(user.getEmail());
            return ResponseEntity.ok(response);
        }

        return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String email = loginDto.getUsernameOrEmail();
        String password = loginDto.getPassword();
        String code = emailVerificationService.sendVerificationCode(email);

//        System.out.println(code);
        codeStore.storeCode(email,password, code);
//        codeStore.getCode(email);
        // get token form tokenProvider
//        String token = tokenProvider.generateToken(authentication);

        return new ResponseEntity<>("Verification code sent to email", HttpStatus.OK);
//        return ResponseEntity.ok(new JWTAuthResponse(token));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupDto signUpDto){


        if(userRepository.existsByUsername(signUpDto.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }


        if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }


        User user = new User();
//        user.setName(signUpDto.getName());
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder
                .encode(signUpDto.getPassword()));

        Role roles = roleRepository.findByName(signUpDto.getRole()).get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }
}
