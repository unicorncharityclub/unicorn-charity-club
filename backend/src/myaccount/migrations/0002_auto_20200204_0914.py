# Generated by Django 2.2.8 on 2020-02-04 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myaccount', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='myaccount',
            old_name='content',
            new_name='Address',
        ),
        migrations.RenameField(
            model_name='myaccount',
            old_name='title',
            new_name='Name',
        ),
        migrations.AddField(
            model_name='myaccount',
            name='Email',
            field=models.CharField(default='abc', max_length=120),
        ),
        migrations.AddField(
            model_name='myaccount',
            name='Mobile',
            field=models.CharField(default='000', max_length=120),
        ),
    ]
