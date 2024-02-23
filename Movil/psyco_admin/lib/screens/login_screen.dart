import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});

  final GlobalKey<FormState> myFormState = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 60),
        child: Form(
            key: myFormState,
            child: Column(
              children: [
                Image.asset(
                  "assets/images/PsycoAdmin.png",
                  height: 200,
                ),
                TextFormField(
                  controller: emailController,
                  decoration:
                      const InputDecoration(label: Text("Correo electrónico")),
                  validator: (value) {
                    String response = "";
                    if (value == null || value.isEmpty) {
                      response = "Campo no puede estar vacio";
                      return response;
                    }
                    if (value.length < 10) {
                      response = "Campo debe tener mas de 10 caracteres";
                      return response;
                    }
                    if (!value.contains("@") && !value.contains(".")) {
                      response = "El valor ingresado no es un correo";
                      return response;
                    } else {
                      return null;
                    }
                  },
                ),
                TextFormField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(label: Text("Contraseña")),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(

                      onPressed: () {
                        print(emailController.text);
                        print(passwordController.text);
                      },
                      child: const Text(
                        "Iniciar Sesión",
                        style: TextStyle(fontSize: 20),
                      )),
                ),
              ],
            )),
      ),
    );
  }
}