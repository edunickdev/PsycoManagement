import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../config/helpers/Auth/auth_services.dart';
// import '../../domain/Entities/user_entity.dart';
import '../providers/providers.dart';

class SignUpWidget extends ConsumerWidget {
  const SignUpWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final namesController = TextEditingController();
    final lastNamesController = TextEditingController();
    final palette = Theme.of(context).colorScheme;

    return FadeInUp(
      child: Column(
        children: [
          Image.asset(
            "assets/images/PsycoAdmin.png",
            height: 150,
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
            child: FilledButton.tonal(
                onPressed: () async {
                  if (context.mounted) {
                    final result = await signUp(
                        "${namesController.value.text} ${lastNamesController.value.text}",
                        emailController.value.text,
                        passwordController.value.text);

                    if (context.mounted) {
                      switch (result.status) {
                        case "usuario creado":
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text(result.message),
                            backgroundColor: palette.surfaceVariant,
                            duration: const Duration(seconds: 4),
                          ));
                          ref
                              .read(modeAuthProvider.notifier)
                              .update((state) => !state);
                          break;
                        case "usuario ya existe":
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text(result.message),
                            backgroundColor: Colors.blue,
                            duration: const Duration(seconds: 4),
                          ));
                        default:
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: const Text(
                                "Oh no, no pudimos realizar el registra, intenta nuevamente"),
                            backgroundColor: Colors.green[600],
                            duration: const Duration(seconds: 4),
                          ));
                      }
                    } else {
                      throw Exception();
                    }
                  }

                  namesController.clear();
                  lastNamesController.clear();
                  emailController.clear();
                  passwordController.clear();
                },
                child: Text(
                  "Registrarme",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                )),
          ),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonal(
                style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all(palette.inversePrimary)),
                onPressed: () {
                  ref.read(modeAuthProvider.notifier).update((state) => !state);
                },
                child: Text(
                  "Ya tengo cuenta",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                )),
          )
        ],
      ),
    );
  }
}
