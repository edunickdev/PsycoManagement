import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:psyco_admin/config/shared/input_validations.dart';
import 'package:psyco_admin/presentation/widgets/shared/custom_input.dart';

import '../../config/helpers/Auth/auth_services.dart';
// import '../../domain/Entities/user_entity.dart';
import '../providers/providers.dart';

class SignUpWidget extends ConsumerWidget {
  final GlobalKey<FormState> formKey;

  const SignUpWidget({required this.formKey, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final namesController = TextEditingController();
    final lastNamesController = TextEditingController();
    final palette = Theme.of(context).colorScheme;
    final size = MediaQuery.of(context).size;

    void register() {
      if (formKey.currentState!.validate()) {
        final names =
            "${namesController.value.text} ${lastNamesController.value.text}";
        final mail = emailController.value.text;
        final password = passwordController.value.text;
        signUp(names, mail, password).then((value) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(value.message),
            backgroundColor: palette.surfaceVariant,
            duration: const Duration(seconds: 4),
          ));
          ref.read(modeAuthProvider.notifier).update((state) => !state);
        }).catchError(
          (error) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: const Text(
                    "Oh no, no pudimos realizar el registra, intenta nuevamente"),
                backgroundColor: Colors.green[600],
                duration: const Duration(seconds: 4),
              ),
            );
          },
        );
      }

      namesController.clear();
      lastNamesController.clear();
      emailController.clear();
      passwordController.clear();
    }

    return FadeInUp(
      child: SizedBox(
        width: double.infinity,
        child: Column(
          children: [
            Image.asset(
              "assets/images/PsycoAdmin.png",
              height: 150,
            ),
            CustomInputWidget(
              control: namesController,
              label: "Nombre(s)",
              validations: const [namesValidations],
            ),
            const SizedBox(height: 10),
            CustomInputWidget(
              control: lastNamesController,
              label: "Apellido(s)",
              validations: const [lastNamesValidations],
            ),
            const SizedBox(height: 10),
            CustomInputWidget(
              control: emailController,
              label: "Correo electrónico(s)",
              validations: const [emailValidations],
            ),
            const SizedBox(height: 10),
            CustomInputWidget(
              control: passwordController,
              label: "Contraseña",
              validations: const [passwordValidations],
              obscure: true,
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: size.width > 650 ? size.width / 3 : double.infinity,
              child: FilledButton.tonal(
                  onPressed: register,
                  child: Text(
                    "Registrarme",
                    style: TextStyle(fontSize: 16, color: palette.secondary),
                  )),
            ),
            SizedBox(
              width: size.width > 650 ? size.width / 3 : double.infinity,
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
      ),
    );
  }
}
