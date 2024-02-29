import 'package:flutter/material.dart';

class SignUpWidget extends StatelessWidget {
  const SignUpWidget({super.key});

  @override
  Widget build(BuildContext context) {

    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final namesController = TextEditingController();
    final lastNamesController = TextEditingController();

    return Column(
      children: [
        Image.asset(
          "assets/images/PsycoAdmin.png",
          height: 90,
        ),
        TextFormField(
          controller: namesController,
          decoration: const InputDecoration(label: Text("Nombre(s)")),
        ),
        TextFormField(
          controller: lastNamesController,
          decoration: const InputDecoration(label: Text("Apellido(s)")),
        ),
        TextFormField(
          controller: emailController,
          decoration: const InputDecoration(label: Text("Correo electrónico")),
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
          child: FilledButton.tonal(
              onPressed: () {
                print(emailController.text);
                emailController.clear();
                print(passwordController.text);
                passwordController.clear();
              },
              child: const Text(
                "Iniciar Sesión",
              )),
        ),
      ],
    );
  }
}
