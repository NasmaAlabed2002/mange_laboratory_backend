import { Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { Laboratory } from './entities/laboratory.entity';
import { InjectModel } from '@nestjs/mongoose';''
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Query  } from 'express-serve-static-core';
@Injectable()
export class LaboratoryService {
  constructor(@InjectModel(Laboratory.name) private LaboratoryModel: Model<Laboratory>) {}

  async create(createLaboratoryDto: CreateLaboratoryDto) : Promise<Laboratory> {
    console.log(createLaboratoryDto);
    const createdLaboratory = new this.LaboratoryModel(createLaboratoryDto);
    return createdLaboratory.save();
  }
 async findAll() {
   return await this.LaboratoryModel.find();
  }


  async findById(id) {
    return await this.LaboratoryModel.findById({_id:id});
  }
  async findOne(id) {
    return await this.LaboratoryModel.findOne({_id:id});
 }
 async getHotelById(id: string): Promise<Laboratory> {
  return this.LaboratoryModel.findById(id).exec();
}

async addImageToHotel(id: string, imageUrl: string): Promise<Laboratory> {
  return this.LaboratoryModel.findByIdAndUpdate(
    id,
    { $push: { images: imageUrl } },
    { new: true },
  );
}

 async update(id: string, updateLaboratoryDto: UpdateLaboratoryDto) {
    await this.LaboratoryModel.findByIdAndUpdate(id, updateLaboratoryDto, {new : true});
  }

 async remove(id: string) {
  await this.LaboratoryModel.findByIdAndDelete(id);
  }
}

