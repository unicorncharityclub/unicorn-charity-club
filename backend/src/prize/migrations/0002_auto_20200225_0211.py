# Generated by Django 2.2.8 on 2020-02-25 02:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('prize', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='prize',
            old_name='ImageName',
            new_name='Name',
        ),
    ]