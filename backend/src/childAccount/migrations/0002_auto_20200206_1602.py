# Generated by Django 3.0.2 on 2020-02-06 23:02

import childAccount.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('childAccount', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='childaccount',
            name='DOB',
            field=models.DateField(default=childAccount.models.today_utc),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='ImpactEmblem',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='Photo',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='School',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='SchoolGrade',
            field=models.CharField(choices=[('Kindergarten', 'Kindergarten'), ('First', 'First'), ('Second', 'Second'), ('Third', 'Third'), ('Fourth', 'Fourth'), ('Fifth', 'Fifth'), ('Sixth', 'Sixth')], default='Kindergarten', max_length=15),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='UnicornName',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='childaccount',
            name='UnicornPowers',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='childaccount',
            name='Name',
            field=models.CharField(max_length=100),
        ),
    ]